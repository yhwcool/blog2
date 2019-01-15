<template>
    <div>
        <Header></Header>
        <div class="read-header">
            <div class="read-title">
                <h1> Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</h1>
            </div>
            <div>
                <span>发表于 2018-12-03</span>    | <span>分类于 Flink</span>  |  <span> 阅读次数 597</span> 
            </div>
        </div>
        <div class="read-content">
            <blockquote>
            <p>原文：<a href="https://data-artisans.com/blog/4-steps-flink-application-production-ready" target="_blank" rel="external">https://data-artisans.com/blog/4-steps-flink-application-production-ready</a><br>作者：Nico Kruber, Markos Sfikas<br>译者：云邪（Jark）</p>
            </blockquote>
            <p>本文阐述了使 Flink 应用达到生产就绪状态所需要的一些配置步骤。在以下部分中，我们概述了重要的配置参数，这些参数是技术领导、DevOps、工程师们在将 Flink 应用程序上线生产之前都需要仔细考虑的。Apache Flink 为大多数配置都提供了开箱即用的默认选项，在许多情况下，它们是POC阶段（概念验证）或探索 Flink 不同 API 和抽象的很好的起点。</p>
            <p>然而，将 Flink 应用程序投入生产还需要额外的配置，这些配置可以高效地调整应用的规模，使其达到生产就绪状态，并能与不同系统之间保持兼容，以保证未来迭代升级的需求。</p>
            <p>下面几点是我们收集的需要在 Flink 应用上线前做的检查：</p>
            <p><a href="https://img.alicdn.com/tfs/TB1qClwtNjaK1RjSZFAXXbdLFXa-1168-1125.png" class="fancybox" rel="group"><img src="https://img.alicdn.com/tfs/TB1qClwtNjaK1RjSZFAXXbdLFXa-1168-1125.png" alt=""></a></p>
            <h2 id="1-明确定义-Flink-算子的最大并发度"><a href="#1-明确定义-Flink-算子的最大并发度" class="headerlink" title="1. 明确定义 Flink 算子的最大并发度"></a>1. 明确定义 Flink 算子的最大并发度</h2><p>Flink 的 keyed state 是由 <a href="https://ci.apache.org/projects/flink/flink-docs-stable/dev/stream/state/state.html#keyed-state" target="_blank" rel="external">key group</a> 进行组织的，并分布在 Flink 算子（operator）的各个并发实例上。Key group 是用来分布和影响 Flink 应用程序可扩展性的最小原子单元，每个算子上的 key group 个数即为最大并发数（maxParallelism），可以手动配置也可以直接使用默认配置。默认值粗略地使用 <code>operatorParallelism * 1.5</code> ，下限 128，上限 32768 。可以通过 <a href="https://ci.apache.org/projects/flink/flink-docs-release-1.6/dev/parallel.html#setting-the-maximum-parallelism" target="_blank" rel="external"><code>setMaxParallelism(int maxParallelism)</code></a> 来手动地设定作业或具体算子的最大并发。</p>
            <p>任何进入生产的作业都应该指定最大并发数。但是，一定要仔细考虑后再决定该值的大小。因为一旦设置了最大并发度（<strong>无论是手动设置，还是默认设置</strong>），之后就无法再对该值做更新。想要改变一个作业的最大并发度，就只能将作业从全新的状态重新开始执行。目前还无法在更改最大并发度后，从上一个 checkpoint 或 savepoint 恢复。</p>
            <p>最大并发度的取值建议设定一个足够高的值以满足应用未来的可扩展性和可用性，同时，又要选一个相对较低的值以避免影响应用程序整体的性能。这是由于一个很高的最大并发度会导致 Flink 需要维护大量的元数据（用于扩缩容），这可能会增加 Flink 应用程序的整体状态大小。</p>
            <h2 id="2-为-Flink-算子指定唯一用户ID（UUID）"><a href="#2-为-Flink-算子指定唯一用户ID（UUID）" class="headerlink" title="2. 为 Flink 算子指定唯一用户ID（UUID）"></a>2. 为 Flink 算子指定唯一用户ID（UUID）</h2><p>对于有状态的 Flink 应用，推荐给每个算子都<a href="https://ci.apache.org/projects/flink/flink-docs-release-1.6/ops/state/savepoints.html#should-i-assign-ids-to-all-operators-in-my-job" target="_blank" rel="external">指定唯一用户ID（UUID）</a>。 严格地说，仅需要给有状态的算子设置就足够了。但是因为 Flink 的某些内置算子（如 window）是有状态的，而有些是无状态的，可能用户不是很清楚哪些内置算子是有状态的，哪些不是。所以从实践经验上来说，我们建议每个算子都指定上 UUID。</p>
            <p>Flink 算子的 UUID 可以通过 <code>uid(String uid)</code> 方法指定。算子 UUID 使得 Flink 有效地将算子的状态从 savepoint 映射到作业修改后（拓扑图可能也有改变）的正确的算子上，这是 <a href="https://data-artisans.com/blog/turning-back-time-savepoints" target="_blank" rel="external">savepoint</a> 在 Flink 应用中正常工作的一个基本要素。</p>
            <h2 id="3-充分考虑-Flink-程序的状态后端"><a href="#3-充分考虑-Flink-程序的状态后端" class="headerlink" title="3. 充分考虑 Flink 程序的状态后端"></a>3. 充分考虑 Flink 程序的状态后端</h2><p>当前 Flink 还不支持状态后端之间的互换功能，也就是当我们用内存状态后端做了一个 savepoint，我们无法把作业改成 RocksDB 状态后端然后恢复。所以，开发人员和工程负责人在将作业投向生产之前要仔细考虑好该 Flink 应用的最合适的状态后端类型。</p>
            <p>关于 Flink 当前支持的三种不同的状态后端类型，可以阅读我们的上一篇文章：<a href="http://wuchong.me/blog/2018/11/21/flink-tips-how-to-choose-state-backends/">《Flink 小贴士 (4): 如何选择状态后端》</a></p>
            <p>对于生产用例来说，强烈建议使用 RocksDB 状态后端，因为这是目前唯一一种支持大型状态和异步操作（如快照过程）的状态后端，异步操作能使 Flink 不阻塞正常数据流的处理的情况下做快照操作。另一方面，使用 RocksDB 状态后端可能存在性能折衷，因为所有状态访问和检索都需要序列化（和反序列化）来跨越 JNI 边界，这与内存状态后端相比可能会影响应用程序的吞吐量。</p>
            <h2 id="4-配置-JobManager-的高可用性（HA）"><a href="#4-配置-JobManager-的高可用性（HA）" class="headerlink" title="4. 配置 JobManager 的高可用性（HA）"></a>4. 配置 JobManager 的高可用性（HA）</h2><p>高可用性（HA）配置确保了 Flink 应用中 JobManager 组件发生潜在故障后的自动恢复，从而将停机时间降到最低。JobManager 的主要职责是协调 Flink 的部署，例如调度和适当的资源分配。</p>
            <p>默认情况下，Flink 为每个集群设置一个 JobManager 实例。这会导致单点故障（SPOF）：如果 JobManager 崩溃了，则无法提交新的作业，而且正在运行的程序也会失败。因此，强烈建议为生产用例<a href="https://ci.apache.org/projects/flink/flink-docs-stable/ops/config.html#high-availability-ha" target="_blank" rel="external">配置高可用性（HA）</a>。</p>
            <p>上述 4 个步骤总结自社区的最佳实践，使得 Flink 应用能够保持状态的同时任意地扩缩容，处理更大规模的数据和状态，并提高系统的可用性。我们强烈建议您在将应用投入生产之前，仔细阅读上述步骤。</p>

                        
            </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style>
.read-header,.read-content{
  width: 780px;
 margin: 40px auto;
}
.read-header{
    text-align: center;
}
.read-content{
    line-height: 25px;
}
</style>

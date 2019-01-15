<template>
    <div class="container">
      <Header></Header>
      <timeline class="timeline">
        <timeline-item bg-color="#9dd8e0">一共1000篇</timeline-item>
        <timeline-title>2019</timeline-title>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-title>2018</timeline-title>  
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
        <timeline-item :hollow="true"><span>12-03</span>Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</timeline-item>
      </timeline>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
  components: {
    Header,
    Timeline,
    TimelineItem,
    TimelineTitle
  }
}
</script>
<style>
  .timeline{
    width: 780px;
    margin: 40px auto;
    text-align: left;
  }
</style>
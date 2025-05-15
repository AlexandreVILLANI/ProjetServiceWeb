<template>
  <div>
    <FullCalendar
        ref="calendar"
        defaultView="timeGridWeek"
        :plugins="calendarPlugins"
        :events="events"
    />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'TestCalendar',
  components: { FullCalendar },
  data() {
    return {
      events: [
        { title: 'RDV 1', start: '2025-04-03T10:00:00', end: '2025-04-03T11:00:00' }
      ],
      calendarPlugins: [ timeGridPlugin, interactionPlugin ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      const api = this.$refs.calendar?.getApi?.()
      console.log("FullCalendar API :", api)
      if (!api) alert("❌ FullCalendar non monté correctement !");
    });
  }
}
</script>

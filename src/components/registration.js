function ParticipantDto (name) {
  this.name = name
  this.events = []
}

function EventDto (name, date, start, end) {
  this.name = name
  this.eventDate = date
  this.startTime = start
  this.endTime = end
}

export default {
  name: 'eventregistration',
  data () {
    return {
      participants: [],
      newParticipant: '',
      errorParticipant: '',
      response: []
    }
  },
  created: function () {
    // Test participants
    const p1 = new ParticipantDto('John')
    const p2 = new ParticipantDto('Jill')
    const event = new EventDto('Gala', '2018-10-31', '18:00', '23:00')
    const event1 = new EventDto('Coachella', '2018-11-31', '17:00', '23:59')
    p2.events.push(event)
    p2.events.push(event1)
    // Test event for p2 participant
    //p2.events=[{"name":"Halloween party","eventDate":"2018-10-31","startTime":"18:00","endTime":"23:00"}]
    // Sample initial content
    this.participants = [p1, p2]
  },
  methods: {
    createParticipant: function (participantName) {
      // Create a new participant and add it to the list of participants
      var p = new ParticipantDto(participantName)
      this.participants.push(p)
      // Reset the name field for new participants
      this.newParticipant = ''
    }
  }
}

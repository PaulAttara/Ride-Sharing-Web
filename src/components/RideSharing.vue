<template>
  <div id="eventregistration">
    <h2>Participants</h2>
    <table>
      <tr v-for="participant in participants" >
        <td>{{ participant.name }}</td>
        <td>
          <ul v-for="event in participant.events">
            <ul>
              <li v-for="(value, property) in event">
                {{property}}: {{value}}
              </li>
            </ul>
          </ul>
        </td>
      </tr>
      <tr>
        <td id="txt">
          <input type="text" v-model="newParticipant" placeholder="Participant Name">
        </td>
        <td>
          <button @click="createParticipant(newParticipant)">Create Participant</button>
        </td>
      </tr>
    </table>
    <router-link to="/app/login">Log Out</router-link>
    <p>
      <span v-if="errorParticipant" style="color:red">Error: {{errorParticipant}} </span>
    </p>
  </div>
</template>

<script src="./registration.js">
</script>

<style>
  #eventregistration {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: rgba(224, 199, 27, 0.72)
  }
  #txt{
    padding-left: 10px;
  }
</style>

<template>
  <div id="about">
    <br>
    <div id="header">
      <h1>Who we are</h1>
    </div>
    <ul>
      <li><figure><img src="../assets/Paul.jpg"><figcaption>Paul Attara</figcaption></figure></li>
      <li><figure><img src="../assets/Lucas.jpg"><figcaption>Lucas Bellido</figcaption></figure></li>
      <li><figure><img src="../assets/Arielle.jpg"><figcaption>Arielle Lasry</figcaption></figure></li>
    </ul>
    <ul>
      <li><figure><img src="../assets/Kamy.jpg"><figcaption>Kamy Moussavi</figcaption></figure></li>
      <li><figure><img src="../assets/Eden.jpg"><figcaption>Eden Ovadia</figcaption></figure></li>
      <li><figure><img src="../assets/Noam_copy.jpg"><figcaption>Noam Suissa</figcaption></figure></li>
    </ul>
    <ul>
      <router-link to="/" id="back">Back to Home</router-link>
    </ul>
  </div>
</template>

<script>
</script>

<style>

  #about{
    height: auto;
  }

  h1{
    font-weight: normal;
  }

  img {
    border-radius: 8px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>

<template>
  <div class="about" style="text-align:center">
    <h1 class="title">Walnut.Direct</h1>
    <p class="squished-p">
      Walnut Hills High School is a big and confusing school to navigate,
      especially for incoming students. That's why we created Walnut.Direct,
      straightforward directions between rooms in Walnut Hills.
    </p>
    <h1 class="subtitle">How to Use It</h1>
    <p class="squished-p">
      On the <router-link to="/">main page</router-link>, type (or choose from
      the dropdown) the name of the classroom you're starting at or a nearby
      classroom. Then, type or select the classroom you're going to. Press Go.
    </p>
    <p class="squished-p">
      You can use the My Schedule page to input your bell schedule so that you
      don't have to remember and re-type the room numbers.
    </p>
    <h1 class="subtitle">The Project:</h1>
    <p class="squished-p">
      Our goal is that any new student can
      <router-link to="/myschedule">type in their schedule</router-link> and use
      our app to get to any classroom in the school. We want the directions to
      be as clear as possible, since the first day at a new school can be
      stressful enough as it is.
    </p>
    <p class="squished-p">
      We've also made sure to make our work as generalizable as possible so that
      it can be extended to work in other buildings, such as hospitals. For this
      reason, we've published our
      <a href="https://www.npmjs.com/package/room-finder">
        room-finder package
      </a>
      on npm so that anyone can use it for another building.
    </p>
    <h1 class="subtitle">Our Club:</h1>
    <p class="squished-p">
      The Walnut Hills Programming Club, a chapter of
      <a href="https://interalliance.org/">INTERalliance</a>, meets every
      Thursday in room 3104 to learn about programming and to work on projects
      that we will present at competitions. The club is open to everyone
      interested in computers and IT. Club members can participate in
      <a href="https://techolympics.org/">TechOlympics</a>, a weekend convention
      for high school students interested in IT, go to summer workshops, and get
      paid internships in local company’s IT departments. If you're interested
      in working on projects like this one, you should come, regardless of how
      much or little programming experience you have!
    </p>
    <h1 class="subtitle">How it works:</h1>
    <p class="squished-p">
      All of the code for this site is available
      <a href="https://github.com/WalnutProgramming/Directions">on GitHub</a>.
      The code for our generalized room-finder package is
      <a href="https://github.com/WalnutProgramming/room-finder">
        also on GitHub </a
      >. (Note that GitHub isn't accessible on the school Wi-Fi.) <br /><br />
      TODO: expand this section
    </p>
    <h1 class="subtitle">Feedback</h1>
    <p class="squished-p">
      You can go to the
      <router-link to="/feedback">
        Feedback
      </router-link>
      section to tell us how we can improve the project. The project is NOT
      finished, and we are aware of a lot of issues, including the fact that
      we're missing the 1400s, 2400s, cafeteria, some rooms in the gym, and some
      rooms in the science wing. However, if you notice any problems, we would
      really appreciate it if you report them in the Feedback form.
    </p>
    <h1 class="subtitle">Special Thanks to</h1>
    <p class="squished-p">
      <a href="https://vuejs.org/">Vue.js</a>, the Javascript framework this
      site was made with <br />
      <a href="https://www.typescriptlang.org/">TypeScript</a>, an open source
      programming language this project is written in<br />
      <a href="https://overpassfont.org/">Overpass</a>, the open source font
      used on this site<br />
      <a href="https://github.com/tcort/dijkstrajs">dijstrajs</a>, the
      implementation of Dijkstra's algorithm that we used<br />
      <a
        href="https://github.com/WalnutProgramming/Directions/blob/master/package.json#L15-L51"
      >
        All of the other packages that our site depends on
      </a>
    </p>
    <h1 class="subtitle">Our School:</h1>
    <p class="squished-p">
      Walnut Hills High School is a college preparatory school for students ingrades 7-12. It is one of the 
      top public high schools in the nation. Walnut Hills has a fairly large campus,including the building itself 
      as well as its two athletic fields. The most notable places in the building include the Arts and Science Wing, 
      Music Lyceum, Library, Forum, Auditorium, and Arcade. Walnut Hills offers classes in a wide range of subjects, 
      all the way from computer science to art. There is also a wide variety of extracurriculars at Walnut too,
      such as the programming club which made this web app!
      <br />
      <br />
    </p>
    <h1 class="subtitle">Improving this page</h1>
    <p class="squished-p">
      If you want to improve this page,
      <a href="https://github.com/">make a GitHub account</a>, then click the
      pencil button (Edit) on the top right corner of the
      <a
        href="https://github.com/WalnutProgramming/Directions/blob/master/src/views/AboutPage.vue"
      >
        source code for this page </a
      >. Make your changes, then type a short description of your change at the
      bottom of the page and click "Propose file change".
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  metaInfo: { title: "About" },
});
</script>

<style scoped>
.title {
  font-size: 6vh;
  color: rgb(0, 39, 116);
}

.subtitle {
  font-size: 5.5vh;
  color: rgb(32, 75, 160);
}

.squished-p {
  margin-left: 5vw;
  margin-right: 5vw;
  font-size: 3vh;
}
</style>

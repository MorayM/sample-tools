<template>
  <div>
    <h3>What does this do?</h3>
    <p>
      I noticed that a lot of my samples had loop points set in the WAV file
      metadata, but it was tricky to read them without specialist tools. This
      tool extracts the loop points from WAV files and generates files for use
      in two popular formats: SFZ and Decent Sampler.
    </p>
    <h3>How does it work?</h3>
    <p>
      Simply drag and drop your WAV files into the drop zone or click on the
      "Choose files" button to get started.
    </p>
    <h3>Wait, I don't want to send my samples to some server!</h3>
    <p>
      You don't have to! This tool runs entirely in your browser. Your samples
      never leave your computer.
    </p>
    <h3>I don't believe you.</h3>
    <p>
      That's fine! You can view the source code for this tool
      <a href="https://github.com/MorayM/sample-tools" target="_blank"
        >on GitHub</a
      >. There's really not much too it.
    </p>
    <h3>Why is this running a browser? Can you make it a downloadable tool?</h3>
    <p>
      Because I don't like installing things on my studio machines. This way
      it'll run reliably on any device without me having to support multiple
      operating systems or having to give users instructions on how to install
      Python or Node or whatever.
    </p>
    <h3>Who made this?</h3>
    <p>
      Hi! I'm Moray Macdonald. I make electronic music as
      <a href="https://cephid.world">Cephid</a> and am also a
      <a href="https://moray.dev">freelance developer</a>. I made this tool
      because I needed to process a whole bunch of samples to use live and
      thought others might find it useful too.
    </p>
    <h3>I broke it :(</h3>
    <p>
      Sorry! Raise an issue
      <a href="https://github.com/MorayM/sample-tools" target="_blank"
        >on GitHub</a
      >
      and I'll take a look.
    </p>
    <h3>This is really useful! Can I buy you a coffee?</h3>
    <p>
      That's very kind! I don't actually drink coffee, but you can
      <a href="https://paypal.me/moraymacdonald" target="_blank"
        >buy me a tea</a
      >
      if you like.
    </p>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script>

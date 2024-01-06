<template>
  <div style="margin-top: 7vh">
    <p class="small-p">
      To open this form separately,
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdGzbqSyRlM1vqVYHJrP3VyKYOtjGX-fwnj04IHlM6-l_tZXA/viewform?usp=sf_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        tap here
      </a>
    </p>
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSdGzbqSyRlM1vqVYHJrP3VyKYOtjGX-fwnj04IHlM6-l_tZXA/viewform?embedded=true"
      style="width: 100%; height: 80vh; background: white"
      frameborder="10"
      marginheight="0"
      marginwidth="0"
      sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      title="Walnut.Direct Feedback Form on Google Forms"
    >
      Loading Google Form…
    </iframe>

    <teleport to="head">
      <title>Walnut.Direct - Feedback</title>
      <meta
        name="description"
        content="Report problems with Walnut.Direct or ask us a question."
      />
    </teleport>
  </div>
</template>

<style scoped>
.small-p {
  margin: 0.1em;
  font-size: 20px;
}
</style>

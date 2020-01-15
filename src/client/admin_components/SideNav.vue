<template>
  <div
    class="sidebar"
    data-color="purple"
    data-image="assets/img/sidebar-5.jpg"
  >
    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->

    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="#/home" class="simple-text">
          Dashboard
        </a>
      </div>

      <ul class="nav">
        <router-link tag="li" active-class="active" to="/home">
          <a>
            <i class="pe-7s-graph"></i>
            <p>Dashboard</p>
          </a>
        </router-link>
        
      </ul>
    </div>
  </div>
</template>

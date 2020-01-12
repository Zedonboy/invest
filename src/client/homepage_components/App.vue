<template>
  <router-view></router-view>
</template>
<style>
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 0.25rem;
}

.alert-info {
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}

.alert-success {
    background-color: #a1e82c;
    color: #d1ecf1;
}

.alert-danger {
    background-color: #fc727a;
    color: #d1ecf1;
}
</style>

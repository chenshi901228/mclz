<template>
    <div id="app">
        <dv-full-screen-container class="app_box">
            <router-view />
        </dv-full-screen-container>
    </div>
</template>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
html,
body,
#app,
.app_box {
    height: 100% !important;
    min-width: 1200px;
}
a {
    text-decoration: none;
}
li {
    list-style: none;
}
</style>

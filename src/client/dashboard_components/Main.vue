<template>
    <div class="main-panel">
        <Navbar/>
        <router-view></router-view>

        <footer class="footer">
            <div class="container-fluid">
                <nav class="pull-left">
                    <ul>
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#">
                               Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <p class="copyright pull-right">
                    &copy; 
                </p>
            </div>
        </footer>

    </div>
</template>
<script>
import Navbar from "./Navbar"
export default {
    components : {Navbar}
}
</script>

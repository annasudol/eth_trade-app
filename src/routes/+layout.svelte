<script>
  import "../app.postcss";
  import "../app.postcss";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "./style.css";
  import "$lib/assets/scss/global.scss";
  import { isMenuOpen } from "$lib/assets/store";
</script>

<div class="layout" class:open={$isMenuOpen}>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>

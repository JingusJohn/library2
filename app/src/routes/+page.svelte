<script lang="ts">
	import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let { message } = data;
</script>

<h1 class="text-cyan-400">{message}</h1>

<form class="flex flex-col">
  <label>test</label>
  <input />
</form>

<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col px-4 py-4" action="?/login" method="POST">

  {#if form?.accountError}
    <p class="text-red-500">{form.accountError}</p>
  {/if}

	<label for="email">Email</label>
	<input value={form?.data?.email ?? ''} name="email" class="border-black border-2" />
	{#if form?.errors?.email}
    <label for="email" class="text-red-500">{form.errors.email[0]}</label>
	{/if}

	<label for="password">Password</label>
	<input name="password" class="border-black border-2" type="password" />
	{#if form?.errors?.password}
    <label for="password" class="text-red-500">{form.errors.password[0]}</label>
	{/if}

  <label for="rememberMe">Remember Me</label>
  <input type="checkbox" name="rememberMe" value={form?.data?.email ?? false} />

	<button type="submit">Submit</button>

</form>

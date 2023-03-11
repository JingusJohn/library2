<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col px-4 py-4" action="?/signup" method="POST">

  {#if form?.accountError}
    <label class="text-red-500">{form.accountError}</label>
  {/if}

	<label>Email</label>
	<input value={form?.data?.email ?? ''} name="email" class="border-black border-2" />
	{#if form?.errors?.email}
    <label for="email" class="text-red-500">{form.errors.email[0]}</label>
	{/if}

	<label>Password</label>
	<input name="password" class="border-black border-2" type="password" />
	{#if form?.errors?.password}
    <label for="password" class="text-red-500">{form.errors.password[0]}</label>
	{/if}

	<label>Confirm Password</label>
	<input name="confirmPassword" class="border-black border-2" type="password" />
	{#if form?.errors?.confirmPassword}
    <label for="confirmPassword" class="text-red-500">{form.errors.confirmPassword[0]}</label>
	{/if}

	<button type="submit">Submit</button>

</form>

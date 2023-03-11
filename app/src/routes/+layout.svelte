<script lang="ts">
	import '../app.css';
</script>

<div class="min-h-screen">
	<div class="flex flex-row justify-between items-center px-4">
		<a class="text-blue-500 font-bold" href="/">The Library</a>
		<div class="flex flex-row items-center space-x-8">
			<a class="text-blue-500 font-bold" href="/">My Libraries</a>
		</div>
		<div class="flex flex-row items-center space-x-8">
			<a class="text-blue-500 font-bold" href="/">Login</a>
			<a class="text-blue-500 font-bold" href="/signup">Sign Up</a>
		</div>
	</div>
	<slot />
</div>

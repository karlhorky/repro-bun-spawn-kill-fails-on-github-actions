import { serve } from 'bun';

serve({
  fetch(request: Request) {
    return new Response('Hello, World!');
  },
});

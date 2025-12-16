# Vibe Coding Experience Documentation

## Tool Selection
I chose **Bolt.new** for this project. The main reason was its accessibility; it runs directly in the browser and requires no local environment setup. It promised a "text-to-app" experience which seemed perfect for quickly building a functional prototype like a Todo List.

## Development Process
The process was surprisingly fast. I used a single comprehensive prompt detailing all the features (Add, Delete, Filter, LocalStorage).
* **Most Effective Prompt:** "Create a modern Todo List app with React/Tailwind, including filtering and local storage persistence."
* **Iterations:** It took about 2 iterations. The first version was functional but the UI was basic. I asked it to improve the design to "Dark Mode", which it applied instantly.

## Challenges and Solutions
One challenge was ensuring the data persisted after refreshing the page. Initially, I wasn't sure if the AI implemented `useEffect` correctly for LocalStorage.
* **Solution:** I tested the app by refreshing the browser. It worked. If it hadn't, I would have simply typed "Fix the local storage issue" into the chat, leveraging the tool's context awareness.
* **Manual Fixes:** I didn't have to write manual code for the logic, but I tweaked the title text in the code manually just to test the editor.

## Reflection
Vibe coding felt like being a "project manager" rather than a "worker." I told the tool *what* to do, and it figured out *how* to do it.
* **Workflow Change:** Instead of worrying about syntax errors or importing libraries, I focused on the feature set.
* **Future Use:** I would definitely use this for starting new projects or creating quick demos. It saves hours of setup time. However, for very specific logic bugs, I still believe understanding the code is necessary.

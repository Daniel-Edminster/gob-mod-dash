<template>
   <transition name="background">
      <div v-if="open" @click="$emit('close')"></div>
   </transition>
   
   <transition name="modal">
      <dialog open v-if="open">
         <header>
            <slot name="header">
               <h2>{{ title }}</h2>
            </slot>
         </header>
         <section>
            <slot></slot>
         </section>
         <menu>
            <slot name="actions">
               <button @click="$emit('close')">Close</button>
            </slot>
         </menu>
      </dialog>
   </transition>
</template>

<script>
export default {
   name: 'BaseModal',
   props: {
      open: {
         type: Boolean,
         required: true
      },
      title: {
         type: String,
         required: false,
         default: "This dialog has no title."
      }
   },
   emits: ['close'],
}
</script>

<style scoped>
div {
   position: fixed;
   top: 0;
   left: 0;
   height: 100vh;
   width: 100%;
   background-color: rgba(0, 0, 0, 0.75);
   z-index: 10;
}

dialog {
   position: fixed;
   top: 20vh;
   left: 10%;
   width: 80%;
   z-index: 100;
   background-color: #2d2b38;
   border-radius: 12px;
   border: none;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
   padding: 0;
   margin: 0;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

header {
   background-color: #24252d;
   color: white;
   width: 100%;
   padding: 1rem;
}

header h2 {
   margin: 0;
}

section {
   padding: 1rem;
}

menu {
   padding: 1rem;
   display: flex;
   justify-content: flex-end;
   margin: 0;
}

@media (min-width: 768px) {
   dialog {
      left: calc(50% - 20rem);
      width: 40rem;
   }
}

div {
   opacity: 1;
   transition: opacity 0.3s;
}

.background-enter-active {
   animation: background 0.3s ease;
}

.background-leave-active {
   animation: background 0.3s ease reverse;
}

.modal-enter-active {
   animation: modal 0.3s ease-out;
}

.modal-leave-active {
   animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
   from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
   }

   to {
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}

@keyframes background {
   from {
      opacity: 0;
   }

   to {
      opacity: 1;
   }
}
</style>
<template>
  <base-modal ref="popup">
    <h2 style="margin-top: 0">{{ title }}</h2>
    <p style="margin-top: 20px;margin-bottom: 20px">{{ message }}</p>
    <div class="btns">
      <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
      <span class="ok-btn" @click="_confirm">{{ okButton }}</span>
    </div>
  </base-modal>
</template>


<script>
import BaseModal from '@/components/BaseModal.vue'

export default {
  name: 'ConfirmDialogue',

  components: { BaseModal },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: 'Annuler', // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
      // Or you can throw an error
      // this.rejectPromise(new Error('User canceled the dialogue'))
    },
  },
}
</script>

<style scoped>
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ok-btn {
  background-color: #791c25;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.cancel-btn {
  background-color: #791c25;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.cancel-btn:hover {
  color: #f1c40f;
}

.ok-btn:hover{
  color: #F1C40F;
}
</style>
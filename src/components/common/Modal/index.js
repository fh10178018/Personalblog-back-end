import Modal from './Modal'

/* istanbul ignore next */
Modal.install = function (app) {
  app.component(Modal.name, Modal)
}

export default Modal

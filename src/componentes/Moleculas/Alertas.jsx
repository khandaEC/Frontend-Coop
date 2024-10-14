import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast';
import BotonNormal from '../Atomos/BotonNormal';

function Alertas() {

  const toast = useRef(null);

  const accept = () => {
    toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });  
  }

  const reject = () => {
    toast.current.show({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  const confirm1 = () => {
    confirmDialog({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: accept,
      accept,
      reject
    })
  }

  const confirm2 = () => {
    confirmDialog({
      message: 'Desea eliminar el registro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: accept,
      reject
    })
  }

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
    </>
  )
}

export default Alertas;
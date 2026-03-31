let swalPromise;

const loadSwal = async () => {
  if (!swalPromise) {
    swalPromise = import("sweetalert2").then((module) => module.default);
  }

  return swalPromise;
};

export const showAlert = async (...args) => {
  const Swal = await loadSwal();
  return Swal.fire(...args);
};

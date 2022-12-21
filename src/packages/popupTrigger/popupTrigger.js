import Swal from "sweetalert2/dist/sweetalert2.js";

export const showSuccess = ({
    title = "Успешно",
    text = "Действие прошло успешно",
    confirmButtonText = "Ок",
} = {}) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: confirmButtonText,
        customClass: {
            title: "rm-popup__title",
            htmlContainer: "rm-popup__text",
            confirmButton: "rm-popup__button",
        },
    });
};

export const showError = ({
    title = "Ошибка",
    text = "Действие завершилось ошибкой",
    confirmButtonText = "Ок",
} = {}) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonText: confirmButtonText,
        customClass: {
            title: "rm-popup__title",
            htmlContainer: "rm-popup__text",
            confirmButton: "rm-popup__button",
        },
    });
};

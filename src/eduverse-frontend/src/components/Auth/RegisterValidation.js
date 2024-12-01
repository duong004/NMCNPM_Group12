function Validation (values) {
    let error = {}
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const password_pattern = /^[a-zA-Z0-9]{6,}$/

    if (values.name === "") {
        error.name = "Cần nhập tên đăng nhập"
    } else {
        error.name = ""
    }

    if (values.email === "") {
        error.email = "Cần nhập Email"
    } else if (!email_pattern.test(values.email)) {
        error.email = "Sai định dạng email"
    } else {
        error.email = ""
    }

    if ( values.password === "") {
        error.password = "Cần nhập mật khẩu"
    } else if (!password_pattern.test(values.password)) {
        error.password = "Mật khẩu tối thiểu 6 ký tự"
    } else {
        error.password = ""
    }

    return error
}

export default Validation
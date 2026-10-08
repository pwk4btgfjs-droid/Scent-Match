document.getElementById("solve").onclick = function () {

    let aValue = document.getElementById("a").value;
    let hValue = document.getElementById("h").value;
    let rValue = document.getElementById("r").value;
    let mValue = document.getElementById("m").value;

    let a = Number(aValue);
    let h = Number(hValue);
    let r = Number(rValue);
    let m = Number(mValue);

    if (
        aValue === "" ||
        hValue === "" ||
        rValue === "" ||
        mValue === "" ||
        a <= 0 ||
        h <= 0 ||
        r <= 0 ||
        m < 0
    ) {
        document.getElementById("result").innerText =
            "Введите корректные значения.";

        return;
    }

    let cubeVolume = a ** 3;

    let cylinderVolume = Math.PI * r ** 2 * h;

    document.getElementById("cube-volume").innerText =
        "Объём кубической ёмкости: " +
        cubeVolume.toFixed(2);

    document.getElementById("cylinder-volume").innerText =
        "Объём цилиндрической ёмкости: " +
        cylinderVolume.toFixed(2);

    let fitsCube = m <= cubeVolume;

    let fitsCylinder = m <= cylinderVolume;

    if (fitsCube && fitsCylinder) {

        document.getElementById("result").innerText =
            "Жидкость поместится в обе ёмкости.";

    } else if (fitsCube) {

        document.getElementById("result").innerText =
            "Жидкость поместится только в кубическую ёмкость.";

    } else if (fitsCylinder) {

        document.getElementById("result").innerText =
            "Жидкость поместится только в цилиндрическую ёмкость.";

    } else {

        document.getElementById("result").innerText =
            "Жидкость не поместится ни в одну из ёмкостей.";

    }

};
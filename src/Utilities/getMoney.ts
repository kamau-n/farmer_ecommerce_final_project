export const getMoney = (package_name: String): Number => {
    console.log("package is : " + package_name)
    if (package_name == "gold") {
        return 800;

    }
    else if (package_name == "sliver") {
        return 500;

    }
    else if (package_name == "bronze") {
        return 300;

    }
    else {
        return 0;
    }

}
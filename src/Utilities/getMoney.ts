import axios from "axios";

export const getMoney = async (package_id: any) => {
    console.log("package is : " + package_id)

    // let packages: any = [];

    const packages_data = await axios.get("http://localhost:8000/packages")
    let packages = packages_data.data;
    // .then((res) => {
    //     let packages = res.data;


    // })

    console.log("here are the packages")

    console.log(packages)
    for (let i = 0; i < packages.length; i++) {
        if (package_id == packages[i].package_id) {
            return (packages[i].package_price);

        }

        else {
            return 0;
        }

    }

}
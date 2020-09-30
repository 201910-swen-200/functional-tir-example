
function filterByName( origList, filterText ) {
    return origList.filter((item) => {
        return item.name.indexOf(filterText) !== -1;
    })
}

function filterByStocked( origList, onlyStocked ) {
    return (!onlyStocked && origList) || origList.filter((item) => item.stocked);
}

export { filterByName, filterByStocked }


module.exports = {
    getDataArray: function (childs) {
        let dataArray = [];
        let stack = [];
        childs.forEach((child) => {
            child['level'] = 0;
            stack.push(child);
        });
        while (stack.length!==0) {
            let element = stack.pop();
            dataArray.push({
                _id: element['_id'],
                name: element.name,
                level: element.level
            });
            if(element.children.length !== 0){
                element.children.forEach((child) => {
                    child['level'] = element.level + 1;
                    stack.push(child);
                })
            }
        }
        return dataArray;
    }
};
const createNode = (val) => {
    return {
        value: val,
        next: null
    }
}

const addNodeToList = (list, node) => {
    if(!list.next) {
        list.next = node;
        return;
    }
    while(list.next !== null) list = list.next;
    list.next = node;
    return;
}

const displayList = (list) => {
    if(!list.next) return;
    while(list.next !== null) {
        list = list.next;
        process.stdout.write(`${list.value} -> `);
    }
}

var list = {};
for(var i=0; i<10; i++) {
    var newNode = createNode(i);
    addNodeToList(list, newNode);
}
displayList(list);

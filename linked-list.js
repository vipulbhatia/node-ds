const createNode = (val) => {
    return {
        value: val,
        next: null
    }
}

const addNodeToList = (list, node) => {
    var ptr = list;
    if(list === null) {
        list = node;
        return list;
    }
    while(ptr.next !== null) ptr = ptr.next;
    ptr.next = node;
    return list;
}

const displayList = (list) => {
    if(list === null) return;
    while(list.next !== null) {
        list = list.next;
        process.stdout.write(`${list.value} -> `);
    }
}

var list = null;
for(var i=0; i<10; i++) {
    const newNode = createNode(i);
    list = addNodeToList(list, newNode);
}
displayList(list);

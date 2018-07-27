const createNode = (val) => {
    return {
        value: val,
        left: null,
        right: null
    }
}

const insertNodeToBST = (bst, node) => {
    var ptr = bst;
    console.log('inserting value', node.value);
    if(bst === null) {
        bst = node;
        return bst;
    }
    while(true) {
        console.log(ptr);
        if(node.value > ptr.value) {
            if(ptr.right === null) {
                ptr.right = node;
                return;
            }
            ptr = ptr.right;
        }
        else {
            if(ptr.left === null) {
                ptr.left = node;
                return;
            }
            ptr = ptr.left;
        }
    }
    return bst;
}

const displayBST = (bst) => {
    if(bst === null) return;

}

var bst = null;
for(i=0; i<10; i++) {
    const newNode = createNode(i);
    bst = insertNodeToBST(bst, newNode);
}
console.log(bst);

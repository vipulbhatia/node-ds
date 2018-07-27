const createNode = (val) => {
    return {
        value: val,
        left: null,
        right: null
    }
}

const insertNodeToBST = (bst, node) => {
    console.log('inserting value', node.value);
    if(bst === null) {
        bst = node;
        return bst;
    }
    var ptr = bst;
    while(true) {
        if(node.value > ptr.value) {
            console.log('going right');
            if(ptr.right === null) {
                ptr.right = node;
                break;
            }
            ptr = ptr.right;
        }
        else {
            console.log('going left');
            if(ptr.left === null) {
                ptr.left = node;
                break;
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
    var newNode = createNode(Math.floor(Math.random() * 100));
    bst = insertNodeToBST(bst, newNode);
}
console.log(bst);
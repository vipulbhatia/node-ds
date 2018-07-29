const createNode = (val) => {
    return {
        value: val,
        left: null,
        right: null
    }
}

const insertNodeToBST = (bst, node) => {
    if(bst === null) {
        bst = node;
        return bst;
    }
    var ptr = bst;
    while(true) {
        if(node.value > ptr.value) {
            if(ptr.right === null) {
                ptr.right = node;
                break;
            }
            ptr = ptr.right;
        }
        else {
            if(ptr.left === null) {
                ptr.left = node;
                break;
            }
            ptr = ptr.left;
        }
    }
    return bst;
}

const insertRecursive = (bst, node) => {
    if(bst.value === undefined) {
        bst.value = node.value;
        bst.left = node.left;
        bst.right = node.right;
        return;
    }
    if(node.value < bst.value) {
        if(bst.left === null) bst.left = node;
        else insertRecursive(bst.left, node);
    }
    else if(node.value > bst.value) {
        if(bst.right === null) bst.right = node;
        else insertRecursive(bst.right, node);
    }
}

const inorderDisplayBST = (bst) => {
    if(bst === null) return;
    inorderDisplayBST(bst.left);
    process.stdout.write(`${bst.value} -> `);
    inorderDisplayBST(bst.right);
}

const swapBST = (bst) => {
    if(bst.left || bst.right) {
        var temp = bst.left;
        bst.left = bst.right;
        bst.right = temp;
    }
    if(bst.left) swapBST(bst.left);
    if(bst.right) swapBST(bst.right);
}

const calculateHeightBST = (bst) => {
    if(bst === null) return 0;
    var lh = calculateHeightBST(bst.left);
    var rh = calculateHeightBST(bst.right);
    if(lh > rh) return lh + 1;
    else return rh + 1;
}

const getPathsFromRoot = (bst, path=[]) => {
    if(bst === null) {
        console.log(path);
        return;
    }
    else path.push(bst.value);
    getPathsFromRoot(bst.left, path);
    getPathsFromRoot(bst.right, path);
    path.pop();
}

var bst1 = null;
var bst2 = {};
[50, 30, 45, 82, 91, 2, 99, 100].forEach((k, v) => {
    var newNode = createNode(k);
    //bst1 = insertNodeToBST(bst1, newNode);
    insertRecursive(bst2, newNode);
});
//inorderDisplayBST(bst1);
console.log(bst2);
inorderDisplayBST(bst2);
swapBST(bst2);
console.log('');
inorderDisplayBST(bst2);
console.log(calculateHeightBST(bst2));
getPathsFromRoot(bst2);
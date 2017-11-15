function Node(key){
    this.key=key;
    this.left=null;
    this.right=null;
    this.height=null;
}
function Tree(){
    this.root=null;
    this.inorder=function(node) {
        if (node == null){
            return;
        } else {
            this.inorder(node.left);
            console.log(node.key);
            this.inorder(node.right);
        }
    }
    this.insert=function (key) {
        let newNode=new Node(key);
        insertNode(newNode,this.root);
    }

    let insertNode=(newNode,oldNode)=>{
        if (oldNode == null) {
            /* create and return a one-node tree */
            oldNode=newNode;
            oldNode.height = 0;
            oldNode.left = oldNode.right = null;
        } else if (newNode.key < oldNode.key) {
            oldNode.left = insertNode(newNode, oldNode.left);
            if (height(oldNode.left) - height(oldNode.right) == 2)
            {
                if (newNode.key < oldNode.left.key){
                    oldNode = singlerotateLL(oldNode);
                }else{
                    oldNode = doublerotateRL(oldNode);
                }
            }
        } else if (newNode.key > oldNode.key) {
            oldNode.right = insertNode(newNode, oldNode.right);
            if (height(oldNode.right) - height(oldNode.left) == 2) {
                if (newNode.key > oldNode.right.key) {
                    oldNode = singlerotateRR(oldNode);
                } else {
                    oldNode = doublerotateLR(oldNode);
                }
            }
        }
        /* else X is in the tree already; we'll do nothing */
        oldNode.height = Math.max(height(oldNode.left), height(oldNode.right)) + 1;
        this.root=oldNode;
        return this.root;
    }
    let height=function (node) {
        if(node==null){
            return -1;
        }else{
            return node.height;
        }
    }
    let singlerotateLL=function(k2) {
        let k1=k2.left;
        k2.left=k1.right;
        k1.right=k2;
        k2.height=Math.max(height(k2.left),height(k2.right))+1;
        k1.height=Math.max(height(k1.left),k2.height)+1;
        return k1;
    }
    let singlerotateRR=function(k1) {
        let k2 = k1.right;
        k1.right = k2.left;
        k2.left = k1;
        k1.height = Math.max(height(k1.left), height(k1.right)) + 1;
        k2.height = Math.max(k1.height, height(k2.right)) + 1;
        return k2;
    }
    let doublerotateRL=function(k3) {
        k3.left = singlerotateRR(k3.left);
        return singlerotateLL(k3);
    }
    let doublerotateLR=function(k3) {
        k3.right = singlerotateLL(k3.right);
        return singlerotateRR(k3);
    }
}

let arr;
document.getElementById('createArr').onclick=function () {
    let number=document.getElementById('number').value;
    number=Math.floor(number);
    arr=[];
    for(let i=0;i<number;i++){
        arr.push(Math.round(Math.random()*number));
    }
    document.getElementById('arr').innerText=arr.join(' ， ');
};
document.getElementById('createAVL').onclick=function () {
    let tree=new Tree();
    arr.forEach(function (a) {
        tree.insert(a);
    })
    tree.inorder(tree.root);
    document.getElementById('result').innerHTML=syntaxHighlight(tree);
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


module.exports = dfs

function dfs(node, get_children, do_action, visited) {
  visited = visited || []

  do_action(node, done)

  visited.push(node)

  function done() {
    get_children(node, callback)
  }

  function callback(children) {
    for(var i = 0, len = children.length; i < len; ++i) {
      if(visited.indexOf(children[i]) !== -1) {
        continue
      }

      dfs(children[i], get_children, do_action, visited)
    }
  }
}

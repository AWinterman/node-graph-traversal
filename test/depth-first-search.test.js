var test = require('tape')
  , dfs = require('../lib/depth-first-search')
  , fs = require('fs')
  , path = require('path')

test('dfs async children getter', function(t) {
  var i = 0

  dfs(i, get_children, do_action)

  function get_children(node, on_edges) {
    if(node > 14) {
      return
    }

    ++i

    setTimeout(on_edges.bind(null, [i]))

    if(i >= 10) {
      setTimeout(function() { on_edges( []) })
    }
  }

  function do_action(node, done) {
    if(node < 14) {
      return done()
    }

    t.end()
  }
})

test('fs example', function(t) {
  var fspath = '.'
    , pending = [fspath]
    , hit = []

  dfs(fspath, get_children, do_action)

  function get_children(node, on_children) {
    fs.stat(node, function(err, stats) {
      if(stats.isDirectory()) {
        return fs.readdir(node, ondir)
      }

      function ondir(err, contents) {
        if(err) {
          console.error(err)
        }

        if(!contents) {
          return
        }

        var children = contents.map(function(d) {
          return path.join(node, d)
        })

        pending.push.apply(pending, children)

        on_children(children)
      }
    })

    hit.push(node)
  }

  function do_action(node, done) {
    console.log(
        'h' + hit.length
      , 'p' + pending.length
      , 'd' + (pending.length - hit.length)
    )
    done()
  }
})

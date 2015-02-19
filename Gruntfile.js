module.exports = function(grunt) {

  var os = require('os');
  var ifaces = os.networkInterfaces();
  var host_ips = [];

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0
      ;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      host_ips.push(iface.address);

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }

    });
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ["js/**/*.js", "css/**/*.css", "html/index.html"],
      options: {
        livereload: {
          hostname: host_ips[0]
        }
      }
    },
    connect: {
      target: {
        options: {
          port: 9000,
          hostname: host_ips[0]
        }
      }
    },
    inject: {
      single: {
        scriptSrc: 'devScript.js',
        files: {
          'index.html': 'html/index.html'
        }
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-inject');

  // Default task(s).
  grunt.registerTask('default', function(target) {
    grunt.task.run(['inject', 'connect', 'watch']);
  });

};
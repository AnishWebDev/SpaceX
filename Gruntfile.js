module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          base: "./",
        },
      },
    },
    less: {
      development: {
        options: {
          paths: ["assets/css"],
        },
        files: { "app/css/main.css": "src/less/main.less" },
      },
      watch: {
        files: "*.less",
        tasks: ["less"],
      },
    },
    watch: {
      styles: {
        options: {
          livereload: true,
          spawn: false,
          event: ["added", "deleted", "changed"],
        },
        files: ["**/*.less"],
        tasks: ["less"],
      },
      js: {
        files: ["src/**/*.js"],
        tasks: ["uglify:my_target"],
      },
      css: {
        files: ["app/**/*.css"],
        tasks: ["cssmin:target"],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "app/css",
            src: ["*.css", "!*.min.css"],
            dest: "app/css",
            ext: ".min.css",
          },
        ],
      },
    },
    uglify: {
      my_target: {
        files: {
          "app/js/app.min.js": ["src/js/app.js"],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["connect:server", "less", "watch", "cssmin", "uglify"]);
};

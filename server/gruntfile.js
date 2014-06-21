module.exports = function (grunt) {

  "use strict";

  grunt.initConfig(
      {
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
          base: {
            src: ['src/**/*.ts'],
            dest: 'build',
            options: {
              module: 'commonjs',
              target: 'es5',
              basePath: 'src',
              sourceMap: true,
              declaration: false
            }
          }
        },

        uglify: {
          minify: {
            options: {
              compress: true,
              sourceMap: false
            },
            files: [
              {expand: true, cwd: 'build/', src: '**/*.js', dest: 'build/'}
            ]
          }
        },

        copy: {
          static_resources: {
            files: [
              {expand: true, src: ['lib/*'], dest: 'build/', filter: 'isFile'},
            ]
          },
          js_to_min_js: {
            files: [
              {src: 'build/<%= pkg.name %>.js', dest: 'build/<%= pkg.name %>.min.js'}
            ]
          }
        },

        watch: {
          src: {
            files: ['src/main/js/**/*.js', 'src/main/js/**/*.ts', 'lib/**'],
            tasks: ['no-uglify']
          }
        },

        clean: {
          build: ['build'],
          no_uglyfied_js: ['build/<%= pkg.name %>.js']
        }

      });

  // Register tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['typescript', 'uglify:minify', 'copy:static_resources', 'clean:no_uglyfied_js']);
  grunt.registerTask('no-uglify', ['typescript', 'copy:static_resources', 'copy:js_to_min_js']);

};
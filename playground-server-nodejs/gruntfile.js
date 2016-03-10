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
              // basePath: 'src',
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
              {expand: true, src: ['static/*'], dest: 'build/'},
            ]
          },
          source_files: {
            files: [
              {expand: true, src: ['src/*'], dest: 'build/', filter: 'isFile'},
            ]
          }
        },

        watch: {
          src: {
            files: ['src/**/*.ts', 'lib/**'],
            tasks: ['default']
          }
        },

        clean: {
          build: ['build'],
          source_maps: "build/**/*.map"
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
  grunt.registerTask('default', ['typescript', 'copy:static_resources']);
  grunt.registerTask('minify', ['typescript', 'copy:static_resources', 'uglify:minify', 'clean:source_maps']);

};
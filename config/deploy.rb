# config valid for current version and patch releases of Capistrano
lock "~> 3.10.1"

set :application, "ui"
set :repo_url, "git@github.com:AlturaSoluciones/fcr-colecta-ui.git"

set :deploy_to, "/home/fcr/apps/#{fetch(:application)}"

append :linked_files, ".env"

append :linked_dirs, "node_modules"

set :ssh_options, {
  verify_host_key: :secure,
  forward_agent: true
}

set :nvm_type, :user
set :nvm_node, 'v8.11.1'
set :nvm_map_bins, %w{node npm yarn}

set :yarn_flags, %w(--silent --no-progress)

namespace :deploy do
 
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end
 
  before "symlink:release", :yarn_deploy
end

#!/bin/bash

set -eu

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export fly_target=${fly_target:-nr}
echo "Concourse API target ${fly_target}"
echo "Tutorial $(basename $DIR)"
export branchName=$(git branch | grep \* | cut -d ' ' -f2)
echo "branch ${branchName}"

pushd "$DIR"
# fly -t nr login  --concourse-url="https://concourse.olivetech.com"
fly -t ${fly_target} validate-pipeline --config pipeline.yml
fly -t ${fly_target} set-pipeline -p nr-new-portal-pipeline -c pipeline.yml --load-vars-from=credentials.yml -v branch-version=${branchName} -n
fly -t ${fly_target} unpause-pipeline -p nr-new-portal-pipeline
fly -t ${fly_target} trigger-job -w -j nr-new-portal-pipeline/nr-build-feature
popd
#fly -t oa set-pipeline -p oa-new-portal-pipeline -c pipeline.yml --load-vars-from=credentials.yml -v branch-version=${branchName} -n
#fly -t oa unpause-pipeline -p oa-new-portal-pipeline
#fly -t oa destroy-pipeline -p oa-new-portal-pipeline
#fly -t oa validate-pipeline --config pipeline.yml
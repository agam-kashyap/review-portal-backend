#!/bin/sh

touch config.env
{
    printf "ATLAS_URI=%s\nPORT=3000" "$ATLAS_URI"
} >> config.env
pwd
ls
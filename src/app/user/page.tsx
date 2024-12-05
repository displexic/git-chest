"use client";

import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { Platform } from "@typings/platform";
import { durationSince, formatDate } from "@utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoLink, GoPeople } from "react-icons/go";

interface GitHubUser {
  user: {
    login: string;
    id: number;
    node_id: string;
    gravatar_id: string;
    type: string;
    site_admin: boolean;
    name?: string;
    company?: string;
    blog?: string;
    location?: string;
    hireable?: boolean;
    bio?: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  };
}

interface FullUser {
  user: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  platform_user: {
    type: Platform;
    data: GitHubUser;
  };
}

export default function User() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FullUser | undefined>();

  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (typeof id !== "string") return;

    invoke<FullUser>("get_user", {
      id: parseInt(id),
    })
      .then((data) => {
        console.log(data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return user ? (
    <main className="max-w-7xl mx-auto my-10">
      <div className="min-w-80 max-w-80">
        <Image
          src={convertFileSrc(user.avatar)}
          alt="Avatar"
          width={300}
          height={300}
          className="rounded-full"
        />

        <div className="mt-5">
          <span className="mt-2 text-xl font-medium">{user.user}</span>
          {user.platform_user.data.user.name && (
            <div className="text-3xl mt-2 font-bold">
              {user.platform_user.data.user.name}
            </div>
          )}
          {user.platform_user.data.user.blog && (
            <div className="mt-2">
              <GoLink className="-mt-1 h-4 w-4 inline text-fg-tertiary" />
              <Link
                href={user.platform_user.data.user.blog}
                className="ml-2 text-link hover:underline"
              >
                {user.platform_user.data.user.blog}
              </Link>
            </div>
          )}
          {user.platform_user.data.user.bio && (
            <div className="mt-2">{user.platform_user.data.user.bio}</div>
          )}
        </div>

        <div className="mt-5 pt-5 border-t border-border flex text-fg-secondary">
          <GoPeople className="h-5 w-5 text-fg-tertiary" />
          <span className="ml-5">
            <b>{user.platform_user.data.user.followers}</b> followers
          </span>
          <span className="ml-2">
            <b>{user.platform_user.data.user.following}</b> following
          </span>
        </div>

        <div className="mt-5 pt-5 border-t border-border text-sm">
          <div>
            <span className="block font-semibold text-fg-tertiary">
              Account Created
            </span>
            <span className="text-violet-600 font-medium">
              {formatDate(user.platform_user.data.user.created_at, {
                onlyDate: true,
              })}
            </span>
            <span className="ml-2 text-purple-600">
              {formatDate(user.platform_user.data.user.created_at, {
                onlyTime: true,
              })}
            </span>
            <span className="ml-2 text-fg-tertiary">
              {durationSince(user.platform_user.data.user.created_at)} ago
            </span>
          </div>
          <div className="mt-2">
            <span className="block font-semibold text-fg-tertiary">
              Account Updated
            </span>
            <span className="text-violet-600 font-medium">
              {formatDate(user.platform_user.data.user.updated_at, {
                onlyDate: true,
              })}
            </span>
            <span className="ml-1 text-purple-600">
              {formatDate(user.platform_user.data.user.updated_at, {
                onlyTime: true,
              })}
            </span>
            <span className="ml-2 text-fg-tertiary">
              {durationSince(user.platform_user.data.user.updated_at)} ago
            </span>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-border text-sm">
          <div>
            <span className="block font-semibold text-fg-tertiary">
              Last Synced
            </span>
            <span className="text-green-600 font-medium">
              {formatDate(user.updated_at, { onlyDate: true })}
            </span>
            <span className="ml-1 text-lime-600">
              {formatDate(user.updated_at, { onlyTime: true })}
            </span>
            <span className="ml-2 text-fg-tertiary">
              {durationSince(user.updated_at)} ago
            </span>
          </div>
          <div className="mt-2">
            <span className="block font-semibold text-fg-tertiary">
              Added to Database
            </span>
            <span className="text-green-600 font-medium">
              {formatDate(user.created_at, { onlyDate: true })}
            </span>
            <span className="ml-1 text-lime-600">
              {formatDate(user.created_at, { onlyTime: true })}
            </span>
            <span className="ml-2 text-fg-tertiary">
              {durationSince(user.created_at)} ago
            </span>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <main className="max-w-7xl mx-auto my-10">Loading</main>
  );
}

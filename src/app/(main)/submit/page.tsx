'use client'

import { useEffect, useState, useContext } from 'react'
import { StoreContext } from '@/app/providers'

// Components
import TextEditor from '@/components/ui/text-editor'
import Card from '@/components/ui/card'
import * as Tabs from '@radix-ui/react-tabs'
import { FileText, Image, Link, LinkIcon, VoteIcon } from 'lucide-react'
import ImagePost from '@/components/create-post/image-post'
import TextPost from '@/components/create-post/text-post'
import LinkPost from '@/components/create-post/link-post'

const SubmitPostPage = () => {
  const [activeTab, setActiveTab] = useState<string>('post')
  const [textInput, setTextInput] = useState<string>('')

  const onSubmit: (commentInput: string) => void = async (
    commentInput: string
  ) => {
    // console.log(commentInput);
  }

  return (
    <div className="grid md:grid-cols-7 gap-4">
      <section className="md:col-span-5 space-y-2">
        <div className="flex justify-between items-center border-b-[1px] border-neutral-focus pb-2 mb-4">
          <h1 className="text-white font-semibold text-lg">Create Post</h1>
          <button className="btn btn-ghost btn-sm rounded-full text-xs font-normal">
            DRAFTS <div className="badge badge-md text-xs badge-accent">0</div>
          </button>
        </div>

        <Card className="p-0 !mt-0">
          <Tabs.Root
            className="flex flex-col w-full"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <Tabs.List
              className="shrink-0 flex border-b border-neutral-focus"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                value="post"
                className="bg-neutral space-x-2 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-base-content select-none  hover:bg-neutral-focus data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative   outline-none cursor-default"
              >
                <FileText className="w-4" />
                <span>Post</span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="image-video"
                className="bg-neutral space-x-2 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-base-content select-none  hover:bg-neutral-focus data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative   outline-none cursor-default"
              >
                <Image className="w-4" />
                <span>Image & Video</span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="link"
                className="bg-neutral space-x-2 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-base-content select-none  hover:bg-neutral-focus data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative   outline-none cursor-default"
              >
                <LinkIcon className="w-4" />
                <span>Link</span>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="poll"
                className="bg-neutral space-x-2 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-base-content select-none  hover:bg-neutral-focus data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative   outline-none cursor-default"
              >
                <VoteIcon className="w-4" />
                <span>Vote</span>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              className="grow p-5 rounded-b-md outline-none "
              value="post"
            >
              <TextPost />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 rounded-b-md outline-none "
              value="image-video"
            >
              <ImagePost />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 rounded-b-md outline-none "
              value="link"
            >
              <LinkPost />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 rounded-b-md outline-none "
              value="poll"
            >
              <p>Poll</p>
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </section>
      <aside className="md:col-span-2">
        <Card className="prose">
          <h4 className="text-white">Posting to Chrap</h4>
          <ol className="text-xs space-y-2 list-inside pl-0">
            <li className="border-b-[1px] border-neutral-focus pb-2">
              Remember the human
            </li>
            <li className="border-b-[1px] border-neutral-focus pb-2">
              Behave like you would in real life
            </li>
            <li className="border-b-[1px] border-neutral-focus pb-2">
              Look for the original source of content
            </li>
            <li className="border-b-[1px] border-neutral-focus pb-2">
              Search for duplicates before posting
            </li>
            <li className="border-b-[1px] border-neutral-focus pb-2">
              Read the community's rules
            </li>
          </ol>
        </Card>
      </aside>
    </div>
  )
}

export default SubmitPostPage

"use client";

import Image from 'next/image';

export function Profile() {
  return (
    <section className="space-y-4">
      <header className="flex items-center gap-4 card p-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop" alt="" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Taylor</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Curating a tech + science feed.</p>
        </div>
      </header>

      <section className="card p-4" aria-labelledby="prefs">
        <h2 id="prefs" className="text-sm font-medium mb-3">Feed preferences</h2>
        <form className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm">Primary topics
            <select className="mt-1 w-full p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" multiple>
              <option>Technology</option>
              <option>Science</option>
              <option>Business</option>
              <option>Health</option>
            </select>
          </label>
          <label className="text-sm">Preferred sources
            <select className="mt-1 w-full p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" multiple>
              <option>Reuters</option>
              <option>BBC</option>
              <option>AP</option>
              <option>The Verge</option>
            </select>
          </label>
          <label className="text-sm">Notifications
            <select className="mt-1 w-full p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <option>Breaking news only</option>
              <option>Top stories hourly</option>
              <option>All activity</option>
            </select>
          </label>
          <div className="flex items-center gap-2 mt-6">
            <button className="px-4 py-2 rounded-md bg-primary-600 text-white">Save</button>
            <button type="button" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700">Reset</button>
          </div>
        </form>
      </section>
    </section>
  );
}

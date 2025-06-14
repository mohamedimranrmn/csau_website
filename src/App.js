import React from 'react';
import { Navbar, Events, Home } from './components';
import Team from './components/Team/Team';
import { Router, Outlet, ReactLocation } from '@tanstack/react-location';
import MediumBlog from './components/Blog/MediumBlog';
import client from './client';
import axios from 'axios';
import JoinUs from './components/JoinUs/JoinUs';

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events",
    element: <Events />,
    loader: async () => {
      const data = await fetchEvents();
      const upcomingEvents = data.filter((event) => event.upcoming);
      const events = data
        .filter((event) => !event.upcoming || event.upcoming === null)
        .sort((a, b) =>
          a.date < b.date ? 1 : b.date < a.date ? -1 : 0
        );;
      return {
        events: events,
        upcomingEvents: upcomingEvents,
      };
    },
  },
  {
    path: "/blogs",
    element: <MediumBlog />,
    loader: async () => {
      return {
        blogs: await getMediumBlogData(),
      };
    },
  },
  {
    path: "/team",
    element: <Team />,
    loader: async () => {
      const data = await fetchTeam();
      const presidents = data.filter((team) => team.designation === "President")
        .sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      const domainHeads = data
        .filter((team) => team.designation === "Head")
        .sort((a, b) =>
          a.domain > b.domain ? 1 : b.domain > a.domain ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      const gensec = data.filter((team) => team.designation === "General Secretary");
      const deputyHeads = data
        .filter((team) => team.designation === "Deputy Head")
        .sort((a, b) =>
          a.domain > b.domain ? 1 : b.domain > a.domain ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      const coreMembers = data
        .filter((team) => team.designation === "Core Member")
        .sort((a, b) =>
          a.domain > b.domain ? 1 : b.domain > a.domain ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      return {
        presidents: presidents,
        domainHeads: domainHeads,
        deputyHeads: deputyHeads,
        coreMembers: coreMembers,
        gensec: gensec,
      };
    },
  },
  {
    path: "/joinus",
    element: <JoinUs />
  },
];

const location = new ReactLocation();

const App = () => {
  return (
    <Router location={location} routes={routes}>
      <div className="App">
        <Navbar />
        <Outlet />
        <div className='background fixed inset-0 z-[-1] bg-no-repeat bg-center bg-cover'>
        </div>
      </div>
    </Router>
  );
}

export default App;

async function fetchTeam() {
  const data = await client.fetch(
      `*[_type == "team"] {
      name,
      lnurl,
      designation,
      year,
      domain,
      department,
      image {
        asset -> {
          _id,
          url
        }
      }
    }`
  );
  return data;
}





async function getMediumBlogData() {
  const resp = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cegcsau", { method: 'GET' })
  const blogs = (resp.data.items)
  return blogs
}

async function fetchEvents() {
  const data = client.fetch(
    `*[_type == "event"] {
        title,
        location,
        slug,
        date,
        description,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        },
        eventPics[] {
          asset -> {
            _id,
            url
          },
          alt
        },
        upcoming,
      }`
  );
  return data;
}
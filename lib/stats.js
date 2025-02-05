/* eslint-disable no-plusplus */
function stats(links, validate) {
  let count = 0;
  const stat = {};
  const arrLinks = [];
  links.forEach((link) => {
    if (link.href !== 'no links found') { arrLinks.push(link.href); }
  });
  stat.total = arrLinks.length;
  stat.unique = [...new Set(arrLinks)].length;

  if (validate) {
    links.forEach((link) => {
      if (link.ok === 'Fail ❌' && link.href !== 'no links found') { count++; }
    });
    stat.broken = count;
  }
  return stat;
}

module.exports = {
  stats,
};

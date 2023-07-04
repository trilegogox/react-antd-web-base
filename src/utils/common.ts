import { FundTwoTone } from "@ant-design/icons";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { DATE_FORMAT } from "./constants";

export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
}

export function getInitial(name: any) {
  if (name === '' || name === null) return '?';

  return name
    .match(/(^\S\S?|\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase();
}

export function timestampFormat(ts: Timestamp) {
  return moment(ts.toDate()).format(DATE_FORMAT)
}
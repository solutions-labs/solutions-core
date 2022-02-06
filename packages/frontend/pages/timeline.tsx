import { Timeline, Text, Avatar } from "@mantine/core";

const TimelinePage = () => (
  <Timeline active={1} bulletSize={24} lineWidth={2}>
    <Timeline.Item
      bullet={<Avatar src="https://github.com/kevenleone.png" size={12} />}
      title="New branch"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve created new branch{" "}
        <Text variant="link" component="span" inherit>
          fix-notifications
        </Text>{" "}
        from master
      </Text>
      <Text size="xs" style={{ marginTop: 4 }}>
        2 hours ago
      </Text>
    </Timeline.Item>

    <Timeline.Item
      bullet={<Avatar src="https://github.com/kevenleone.png" size={12} />}
      title="Commits"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve pushed 23 commits to
        <Text variant="link" component="span" inherit>
          fix-notifications branch
        </Text>
      </Text>
      <Text size="xs" style={{ marginTop: 4 }}>
        52 minutes ago
      </Text>
    </Timeline.Item>

    <Timeline.Item
      title="Pull request"
      bullet={<Avatar src="https://github.com/kevenleone.png" size={12} />}
      lineVariant="dashed"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve submitted a pull request
        <Text variant="link" component="span" inherit>
          Fix incorrect notification message (#187)
        </Text>
      </Text>
      <Text size="xs" style={{ marginTop: 4 }}>
        34 minutes ago
      </Text>
    </Timeline.Item>

    <Timeline.Item
      title="Code review"
      bullet={<Avatar src="https://github.com/kevenleone.png" size={12} />}
    >
      <Text color="dimmed" size="sm">
        <Text variant="link" component="span" inherit>
          Robert Gluesticker
        </Text>{" "}
        left a code review on your pull request
      </Text>
      <Text size="xs" style={{ marginTop: 4 }}>
        12 minutes ago
      </Text>
    </Timeline.Item>
  </Timeline>
);

export default TimelinePage;
